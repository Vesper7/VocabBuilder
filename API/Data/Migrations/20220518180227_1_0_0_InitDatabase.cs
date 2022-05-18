using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class _1_0_0_InitDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "vocab_builder");

            migrationBuilder.CreateTable(
                name: "flashcard",
                schema: "vocab_builder",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    top_content = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    bottom_content = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_flashcard", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_flashcard_id",
                schema: "vocab_builder",
                table: "flashcard",
                column: "id",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "flashcard",
                schema: "vocab_builder");
        }
    }
}
