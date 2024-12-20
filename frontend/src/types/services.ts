export type ServiceStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type ServicePriority = 'low' | 'medium' | 'high' | 'urgent';
export type DrainageType = 'rainwater' | 'sewage' | 'mixed';
export type PipelineType = 'main' | 'branch' | 'connection';

export interface DrainageService {
  id: string;
  serviceType: 'drainage';
  location: string;
  drainageType: DrainageType;
  pipelineType: PipelineType;
  blockageLevel: number; // 1-10
  pipelineDiameter: number; // mm
  estimatedLength: number; // meters
  requestDate: Date;
  scheduledDate?: Date;
  completionDate?: Date;
  status: ServiceStatus;
  priority: ServicePriority;
  description: string;
  requester: {
    id: string;
    name: string;
    department: string;
    contact: string;
  };
  assignedTeam?: {
    id: string;
    name: string;
    contact: string;
  };
  equipmentUsed?: string[];
  materialsUsed?: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: string;
  }>;
  beforePhotos?: string[];
  afterPhotos?: string[];
  maintenanceHistory?: Array<{
    date: Date;
    type: string;
    description: string;
    performedBy: string;
  }>;
  estimatedCost: number;
  actualCost?: number;
  remarks?: string;
}

export interface DrainageServiceFormData extends Omit<DrainageService, 
  'id' | 'serviceType' | 'requestDate' | 'status' | 'completionDate' | 'actualCost' | 'materialsUsed' | 'beforePhotos' | 'afterPhotos' | 'maintenanceHistory'> {} 