export default class UserModel {
    constructor({ id, name, phone, profilePhoto, email, fechaNacimiento, role }) {
      this.id = id;
      this.name = name;
      this.phone = phone;
      this.profilePhoto = profilePhoto || null;
      this.email = email;
      this.fechaNacimiento = fechaNacimiento;
      this.role = role;
    }
  }
  