using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebCar.ViewModel
{
    public class RentalModel
    {
        public int RentalId { get; set; }
        public DateTime? RentalDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int UserId { get; set; }
        public int CarId { get; set; }
        public CarModel CarAbout { get; set; }
        public UserModel UserAbout { get; set; }
    }
}