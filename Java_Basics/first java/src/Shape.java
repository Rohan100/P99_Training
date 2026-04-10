public abstract class Shape {
    String color;
    abstract public int calculateArea();
}

class Rectangle extends  Shape {
    int length,width;
    public Rectangle(int length,int width,String color) {
        this.length = length;
        this.width = width;
        this.color = color;
    }

    @Override
    public int calculateArea() {
        return length * width;
    }
}


