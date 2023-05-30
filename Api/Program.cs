using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddDbContext<ContactDbContext>( o =>o.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));

builder.Services.AddScoped<IContactRepository, ContactRepository>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(p=>p.WithOrigins("http://localhost:3000")
.AllowAnyHeader().AllowAnyMethod());

app.UseHttpsRedirection();


//End Point  //Get Request
app.MapGet("/contact", (IContactRepository repo) => repo.GetAll())
.Produces<ContactDtos[]>(StatusCodes.Status200OK);
app.MapGet("/contact/{contactId:int}", async (int contactId, IContactRepository repo) => {
    var contact = await repo.Get(contactId);
    if(contact == null)
        return Results.Problem($"contact with ID {contactId} not found", statusCode: 404);
    return Results.Ok(contact);
}).ProducesProblem(404).Produces<ContactDetailDto>(StatusCodes.Status200OK);

// Post Request
app.MapPost("/contact", async([FromBody]ContactDetailDto dto, IContactRepository repo) =>
{
    var newContact = await repo.Add(dto);
    return Results.Created($"/contact/{newContact.Id}" , newContact);

}).Produces<ContactDetailDto>(StatusCodes.Status201Created);

// Post Request
app.MapPut("/contact", async([FromBody]ContactDetailDto dto, IContactRepository repo) =>
{
    if(await repo.Get(dto.Id) == null){
        return Results.Problem($"House{dto.Id} not found",
         statusCode : 404);
    }
    var UpdatedContact = await repo.Update(dto);
    return Results.Ok(UpdatedContact);
}).ProducesProblem(404).Produces<ContactDetailDto>(StatusCodes.Status200OK);

// Delete Request
app.MapDelete("/contact/{contactId:int}" , async (int  contactId, IContactRepository repo) =>
{
    if (await repo.Get(contactId) == null){
        return Results.Problem($"Contact {contactId} not found", statusCode:404);
    }
    await repo.Delete(contactId);
    return Results.Ok();
}).ProducesProblem(404).Produces(StatusCodes.Status200OK);
app.Run();

