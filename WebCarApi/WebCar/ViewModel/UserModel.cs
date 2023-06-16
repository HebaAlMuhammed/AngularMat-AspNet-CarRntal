using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebCar.ViewModel
{
    public class UserModel
    {
        public int? UserId { get; set; }
        public string UserName { get; set; }
        public string NameSurname { get; set; }
        public string Tel { get; set; }
        public string Mail { get; set; }
        public string Photo { get; set; }
        public string Password { get; set; }
        public int UserAdmin { get; set; }
    }
}