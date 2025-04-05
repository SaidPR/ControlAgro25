export default class UserModel {
    constructor({ id, name, phone, profilePhoto }) {
      this.id = id;
      this.name = name;
      this.phone = phone;
      this.profilePhoto = profilePhoto || null;
    }
  }
  