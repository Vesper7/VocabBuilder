using API.Data.Configuration;
using API.Data.DTOs;
using API.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                if (flashcardDto == null 
                    || flashcardDto.TopContent == string.Empty 
                    || flashcardDto.BottomContent == string.Empty)
                {
                    return new OkObjectResult(new
                    {
                        Result = false,
                        ErrorMessage = "Brak danych do zapisania"
                    });
                }

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

        [HttpGet("get")]
        public async Task<ActionResult<IEnumerable<Flashcard>>> Get()
        {
            var flashcards = await _context.Flashcards.ToListAsync();

            if (flashcards.Count == 0)
            {
                return NotFound();
            }

            return flashcards;
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<FlashcardDto>> GetById(int id)
        {
            var flashcards = await _context.Flashcards.FindAsync(id);

            if (flashcards is null)
            {
                return NotFound();
            }

            return new OkObjectResult(new
            {
                Data = new
                {
                    TopContent = flashcards.TopContent,
                    BottomContent = flashcards.BottomContent
                }
            });
        }
    }
}
