using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            this._context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret(){
            return "Secret";
        }

        
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError(){
            var t = _context.Users.Find(-1);
            var tt = t.ToString();
            return tt;
        }

        
        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound(){
            var t = _context.Users.Find(-1);
            if(t == null) return NotFound();
            return Ok(t);
        }
        
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest(){
            return BadRequest("Bad request");
        }
    }
}