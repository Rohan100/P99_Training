class BankAccount:

    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def __str__(self):
        return f"Account Holder: {self.owner}, Balance: ₹{self.balance}"

    def __repr__(self):
        return f"BankAccount('{self.owner}', {self.balance})"

    def __add__(self, other):
        return  self.balance + other.balance

    def __gt__(self, other):
        return self.balance > other.balance

    def __len__(self):
        return len(str(self.balance))

    def __del__(self):
        print(f"Account of {self.owner} is deleted.")


acc1 = BankAccount("Rohan", 5000)
acc2 = BankAccount("Amit", 8000)

print(acc1)                 # __str__
print(repr(acc1))          # __repr__

print(acc1 + acc2)         # __add__
print(acc1 > acc2)         # __gt__

print(len(acc1))           # __len__

del acc1