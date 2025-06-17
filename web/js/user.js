function UserInfo (name, avatar, email, uid, gender, birthday, country) {
    this.name = name;        // 用户名/昵称
    this.avatar = avatar;      // 头像URL
    this.email = email;       // 邮箱
    this.uid = uid;         // 用户唯一ID
    this.gender = gender;       // 性别 0-未知 1-男 2-女
    this.birthday = birthday;  // 生日日期对象
    this.country = country;     // 国家
}