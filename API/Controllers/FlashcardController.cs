using API.Data.Configuration;
using API.Data.DTOs;
using API.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FlashcardController : Controller
    {
        private readonly DataContext _context;

        public FlashcardController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(FlashcardDto flashcardDto)
        {
            try
            {
                var flashcard = new Flashcard
                {
                    BottomContent = flashcardDto.BottomContent,
                    TopContent = flashcardDto.TopContent
                };

                _context.Flashcards.Add(flashcard);

                await _context.SaveChangesAsync();

                return new OkObjectResult(new
                {
                    Result = true
                });
            }
            catch (Exception ex)
            {
                return new OkObjectResult(new
                {
                    Result = false,
                    ErrorMessage = ex.Message
                });
            }
        }
    }
}
