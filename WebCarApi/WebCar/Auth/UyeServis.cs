using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebCar.Models;
using WebCar.ViewModel;

namespace WebCar.Auth
{
    public class UyeServis
    {
        WebCarDBEntities db = new WebCarDBEntities();

        public UserModel  UyeOturumAc(string Kadı , string parola)
        {
            UserModel user = db.User.Where(s => s.
            UserName == Kadı && s.Password == parola).Select(x =>
                new UserModel() {
                    UserId = x.UserId,
                    NameSurname = x.NameSurname,
                    UserName = x.UserName,
                    Mail = x.Mail,
                    Tel = x.Tel,
                    Photo = x.Photo,
                    Password = x.Password,
                    UserAdmin = x.UserAdmin
                }).SingleOrDefault();
            return user;
        }
    }
}