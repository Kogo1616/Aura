namespace Aura_Core.Models.Response;

public class ServiceResponse<T>
{
    public bool Succeeded { get; set; }
    public string[] Errors { get; set; } = [];
    public T Data { get; set; }

    public static ServiceResponse<T> Success(T data) => new() { Succeeded = true, Data = data };
    public static ServiceResponse<T> Fail(params string[] errors) => new() { Succeeded = false, Errors = errors };
}
