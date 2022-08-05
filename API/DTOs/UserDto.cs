﻿namespace API.DTOs;

public class UserDto
{
    public string UserName { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public string PhotoUrl { get; set; } = string.Empty;
    public string KnownAs { get; set; } = string.Empty;
}