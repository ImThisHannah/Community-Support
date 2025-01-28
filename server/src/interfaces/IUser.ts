interface IUser {
    email: string;
    password?: string; // Optional for existing users
    role: string; // 'user', 'volunteer', 'resourceProvider', 'admin'
  }
  
  interface IUserDocument extends IUser, Document {} 
  
  interface IUserModel extends Model<IUserDocument> {
    register(userData: IUser): Promise<IUserDocument>;
    login(email: string, password: string): Promise<IUserDocument | null>;
  }