using Microsoft.EntityFrameworkCore;


public interface IContactRepository
{
    Task<List<ContactDtos>> GetAll();
    Task<ContactDetailDto?> Get(int id);
    Task<ContactDetailDto> Add(ContactDetailDto dto);
    Task<ContactDetailDto> Update(ContactDetailDto dto);

    Task Delete(int id);

    
}
public class ContactRepository : IContactRepository
{
    private readonly ContactDbContext context;

    public ContactRepository(ContactDbContext context)
    {
        this.context = context;

    }

    private static void DtoToEntity(ContactDetailDto dto, ContactEntity e)
    {
        e.firstName = dto.firstName;
        e.LastName = dto.LastName;
        e.Email = dto.Email;
        e.PhoneNumber = dto.PhoneNumber;
        

    }
    private static ContactDetailDto EntityToDeltaDto(ContactEntity e)
    {
         return new ContactDetailDto
            (e.Id,e.firstName,e.LastName,e.Email,e.PhoneNumber);

    }

    public async Task<List<ContactDtos>> GetAll()
    {
        return await context.Contacts.Select
            (h => new ContactDtos(h.Id, h.firstName,h.LastName,h.Email,h.PhoneNumber)).ToListAsync();

    }
    //Get Method
    public async Task<ContactDetailDto?>  Get(int Id)
    
    {
        var e = await context.Contacts.SingleOrDefaultAsync
        (
            h => h.Id == Id);
        if(e == null)
            return null;
        return EntityToDeltaDto(e);
    }

    // create Method
    public async Task<ContactDetailDto> Add(ContactDetailDto dto)
    {
        var entity = new ContactEntity();
        DtoToEntity(dto, entity);
        context.Contacts.Add(entity);
        await context.SaveChangesAsync();
        return EntityToDeltaDto(entity);

    }

    // update
    public async Task<ContactDetailDto> Update(ContactDetailDto dto)
    {
        var entity = await context.Contacts.FindAsync(dto.Id);
        if(entity == null){
            throw new ArgumentException($"error updating contact {dto.Id}");
        }
        DtoToEntity(dto, entity);
        context.Entry(entity).State = EntityState.Modified;
        await context.SaveChangesAsync();

        return EntityToDeltaDto(entity);
    }

    // Delete
    public async Task Delete(int id)
    {
        var entity = await context.Contacts.FindAsync(id);
        if(entity == null)
        {
            throw new ArgumentException($"Error deleting contact {id}");
        }
        context.Contacts.Remove(entity);
        await context.SaveChangesAsync();

    }
}