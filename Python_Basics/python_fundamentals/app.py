def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Decorator: Before function execution")
        result = func(*args, **kwargs)
        print("Decorator: After function execution")
        return result
    return wrapper


class Demo:

    def __init__(self, name):
        self.name = name
        print(f"Constructor: Object created for {self.name}")

    @my_decorator
    def say_hello(self):
        print(f"Hello, {self.name}!")

    def __del__(self):
        print(f"Destructor: Object destroyed for {self.name}")


obj = Demo("Rohan")

obj.say_hello()

del obj