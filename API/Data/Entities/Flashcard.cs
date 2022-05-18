namespace API.Data.Entities
{
    public class Flashcard
    {
        public int Id { get; set; }
        public string TopContent { get; set; } = string.Empty;
        public string BottomContent { get; set; } = string.Empty;
    }
}
