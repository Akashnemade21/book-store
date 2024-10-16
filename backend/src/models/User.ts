import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from "../config/database";

export enum ROLE {
  admin = "admin",
  regular = "regular",
}

export enum STATUS {
  active = "active",
  deactive = "inactive",
}

export interface UserAttributes {
  id: number;
  password: string;
  userType: ROLE;
  name: string;
  email: string;
  status: STATUS;
  profilePic?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export default class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public password!: string;
  public userType!: ROLE;
  public name!: string;
  public email!: string;
  public status!: STATUS;
  public profilePic?: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: false,
    },
    userType: {
      type: DataTypes.ENUM("admin", "regular"),
      allowNull: false,
      defaultValue: "regular",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "deactive"),
      allowNull: false,
      defaultValue: "active",
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);
