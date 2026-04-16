def call_twice(func):
    def wrapper(*args, **kwargs):
        func(*args, **kwargs)
        func(*args, **kwargs)
    
    return wrapper


class Demo:

    def __init__(self, name):
        self.name = name
        print(f"Constructor: Object created for {self.name}")

    @call_twice
    def say_hello(self):
        print(self.name)

    def __del__(self):
        print(f"Destructor: Object destroyed for {self.name}")


obj = Demo("Rohan")

obj.say_hello()

del obj