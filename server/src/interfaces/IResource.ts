interface IResource {
    name: string;
    description: string;
    type: string; // 'food', 'shelter', 'medical', 'other'
    location: { 
      type: string; 
      coordinates: number[]; 
    };
    contactInfo: { 
      phone?: string; 
      email?: string; 
      website?: string; 
    };
  }
  
  interface IResourceDocument extends IResource, Document {} 
  
  interface IResourceModel extends Model<IResourceDocument> {}