using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configuration
{
    internal class FlashcardConfig : IEntityTypeConfiguration<Flashcard>
    {
        public void Configure(EntityTypeBuilder<Flashcard> builder)
        {
            builder.ToTable(name: "flashcard", schema: "vocab_builder");
            builder.HasKey(word => word.Id);
            builder.HasIndex(word => word.Id).IsUnique();

            ConfigureColumns(builder);
        }

        private void ConfigureColumns(EntityTypeBuilder<Flashcard> builder)
        {
            builder.Property(flashcard => flashcard.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd()
                .IsRequired();

            builder.Property(flashcard => flashcard.TopContent)
                .HasColumnName("top_content")
                .IsRequired()
                .HasMaxLength(256);
            builder.Property(flashcard => flashcard.BottomContent)
                .HasColumnName("bottom_content")
                .IsRequired()
                .HasMaxLength(256);
        }
    }
}
