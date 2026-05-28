package model;

public class Address {
    private final String street;
    private final String city;
    private final String state;
    private final String pinCode;

    public Address(String street, String city, String state, String pinCode) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.pinCode = pinCode;
    }

    public String getStreet() {
        return street;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getPinCode() {
        return pinCode;
    }

    @Override
    public String toString() {
        return street + ", " + city + ", " + state + " - " + pinCode;
    }
}
