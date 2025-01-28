interface IVolunteer {
    user: IUserDocument; 
    skills: string[];
    availability: { day: string, startTime: string, endTime: string }[];
    location: { 
      type: string; 
      coordinates: number[]; 
    };
  }
  
  interface IVolunteerDocument extends IVolunteer, Document {} 
  
  interface IVolunteerModel extends Model<IVolunteerDocument> {
    findByUserId(userId: string): Promise<IVolunteerDocument | null>;
  }