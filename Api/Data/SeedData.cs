using Microsoft.EntityFrameworkCore;

public static class SeedData{
    public static void Seed(ModelBuilder builder1)
    {
        builder1.Entity<ContactEntity>().HasData(new List<ContactEntity>
        {
            new ContactEntity
            {
                Id = 1,
                firstName = "Vineet",
                LastName = " Rai",
                Email = " Vineetrai826@gmail.com",
                PhoneNumber = 0452262502,
            },
            new ContactEntity
            {
                Id = 2,
                firstName = "Mamta",
                LastName = " Rai",
                Email = " Mamta@826@gmail.com",
                PhoneNumber =  0452262502,
            },
            new ContactEntity
            {
                Id = 3,
                firstName = "Tushar",
                LastName = " Rai",
                Email = " TusharRai826@gmail.com",
                PhoneNumber =  0452262502,
            },
            new ContactEntity
            {
                Id = 4,
                firstName = "Naga",
                LastName = " Rai",
                Email = " Nagarai826@gmail.com",
                PhoneNumber =  0452262502,
            },
            new ContactEntity
            {
                Id = 5,
                firstName = "raju",
                LastName = " Rai",
                Email = " Rajurai826@gmail.com",
                PhoneNumber =  0452262502,
            }
          
            
        });

    }
}