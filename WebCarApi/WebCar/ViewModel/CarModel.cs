using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebCar.ViewModel
{
    public class CarModel
    {
        public int CarId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string CategoryName { get; set; }
        public string Cost { get; set; }
        public string Photo { get; set; }
        public string CarNo { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public DateTime? Date { get; set; }
        public bool? Ranted { get; set; }
        public string Description { get; set; }
    }
}