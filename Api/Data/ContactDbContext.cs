
using Microsoft.EntityFrameworkCore;

public class ContactDbContext : DbContext
{

    // Creating the constructor
    public ContactDbContext(DbContextOptions<ContactDbContext> o): base(o){}

    public DbSet<ContactEntity> Contacts => Set<ContactEntity>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // storing the data
        var folder = Environment.SpecialFolder.LocalApplicationData; // confusion
        var path = Environment.GetFolderPath(folder);
        optionsBuilder
        .UseSqlite($"Data Source = {Path.Join(path, "contact.db")}");
        
        /* var databasePath = "/Users/vineetrai/Documents/contact.db"; // Replace with the desired file path

        optionsBuilder
        .UseSqlite($"Data Source = {databasePath}");*/
    }

    // calling the seed data
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // its just a model, we need to create the instruction via mirgration
        SeedData.Seed(modelBuilder);
    }

    
}