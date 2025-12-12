using WalkWord.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace WalkWord.Api.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext db)
        {
            // garante que o banco responde
            if (!db.Database.CanConnect())
                return;

            // verifica se a tabela Products existe no schema public
            var productsTableExists = db.Database
                .SqlQueryRaw<int>(@"
                    SELECT 1
                    FROM information_schema.tables
                    WHERE table_schema = 'public'
                      AND table_name = 'Products'
                    LIMIT 1
                ")
                .Any();

            if (!productsTableExists)
                return;

            // agora sim é seguro consultar
            if (!db.Products.Any())
            {
                db.Products.AddRange(
                    new Product
                    {
                        Name = "Camiseta WalkWord",
                        Description = "Camiseta oversized",
                        Price = 99.90m,
                        Stock = 20,
                        Active = true
                    },
                    new Product
                    {
                        Name = "Moletom WalkWord",
                        Description = "Moletom pesado",
                        Price = 199.90m,
                        Stock = 10,
                        Active = true
                    }
                );

                db.SaveChanges();
            }
        }
    }
}
