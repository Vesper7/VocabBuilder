using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace API.Data.Configuration
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Flashcard> Flashcards => Set<Flashcard>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
