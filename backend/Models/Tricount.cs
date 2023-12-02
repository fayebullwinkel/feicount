﻿namespace tricount.Models;

public class Tricount
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public Currency? Currency { get; set; }
    public Category? Category { get; set; }
    public List<User> Users { get; set; } = new();
    public List<Expense> Expenses { get; set; } = new();
}