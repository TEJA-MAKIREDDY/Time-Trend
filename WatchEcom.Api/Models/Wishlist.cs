// WatchEcom.Api/Models/Wishlist.cs
using System;

namespace WatchEcom.Api.Models
{
    public class Wishlist
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int WatchId { get; set; }
        public DateTime DateAdded { get; set; }
        
        // Navigation property
        public virtual Watch Watch { get; set; }
    }
}