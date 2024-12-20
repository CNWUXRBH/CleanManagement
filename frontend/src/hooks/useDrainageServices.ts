import { useState, useCallback } from 'react';
import type { DrainageService, DrainageServiceFormData } from '../types/services';

export interface Team {
  id: string;
  name: string;
  contact: string;
  specialization: string[];
  availability: boolean;
  currentLoad: number;
  maxLoad: number;
}

// 模拟初始团队数据
const initialTeams: Team[] = [
  {
    id: '1',
    name: '管道疏通A组',
    contact: '13800138001',
    specialization: ['雨水管', '污水管'],
    availability: true,
    currentLoad: 2,
    maxLoad: 5,
  },
  {
    id: '2',
    name: '管道疏通B组',
    contact: '13800138002',
    specialization: ['雨水管'],
    availability: true,
    currentLoad: 1,
    maxLoad: 4,
  },
  {
    id: '3',
    name: '管道疏通C组',
    contact: '13800138003',
    specialization: ['污水管'],
    availability: true,
    currentLoad: 0,
    maxLoad: 3,
  },
];

// 模拟初始服务数据
const initialServices: DrainageService[] = [
  {
    id: '1',
    serviceType: 'drainage',
    location: '东区主楼地下室',
    drainageType: 'sewage',
    pipelineType: 'main',
    blockageLevel: 8,
    pipelineDiameter: 200,
    estimatedLength: 50,
    requestDate: new Date('2023-12-15'),
    status: 'in_progress',
    priority: 'high',
    description: '地下室污水管堵塞，需要紧急处理',
    requester: {
      id: 'user1',
      name: '张三',
      department: '物业部',
      contact: '13900139001',
    },
    estimatedCost: 2500,
  },
  {
    id: '2',
    serviceType: 'drainage',
    location: '西区停车场',
    drainageType: 'rainwater',
    pipelineType: 'branch',
    blockageLevel: 5,
    pipelineDiameter: 150,
    estimatedLength: 30,
    requestDate: new Date('2023-12-16'),
    status: 'pending',
    priority: 'medium',
    description: '停车场雨水管需要定期清理',
    requester: {
      id: 'user2',
      name: '李四',
      department: '后勤部',
      contact: '13900139002',
    },
    estimatedCost: 1500,
  },
];

export function useDrainageServices() {
  const [services, setServices] = useState<DrainageService[]>(initialServices);
  const [teams, setTeams] = useState<Team[]>(initialTeams);

  const handleSubmit = useCallback(async (data: DrainageServiceFormData) => {
    const newService: DrainageService = {
      id: Date.now().toString(),
      serviceType: 'drainage',
      requestDate: new Date(),
      status: 'pending',
      ...data,
    };
    setServices(prev => [...prev, newService]);
    return newService;
  }, []);

  const handleAssignTeam = useCallback((serviceId: string, teamId: string) => {
    setServices(prev => prev.map(service => {
      if (service.id === serviceId) {
        const team = teams.find(t => t.id === teamId);
        if (team && team.currentLoad < team.maxLoad) {
          setTeams(prevTeams => prevTeams.map(t => 
            t.id === teamId ? { 
              ...t, 
              availability: t.currentLoad + 1 < t.maxLoad,
              currentLoad: t.currentLoad + 1,
            } : t
          ));
          return {
            ...service,
            status: 'in_progress',
            assignedTeam: team,
            scheduledDate: new Date(),
          };
        }
      }
      return service;
    }));
  }, [teams]);

  const handleScheduleService = useCallback((serviceId: string, date: Date) => {
    setServices(prev => prev.map(service => {
      if (service.id === serviceId) {
        return {
          ...service,
          scheduledDate: date,
        };
      }
      return service;
    }));
  }, []);

  const handleServiceComplete = useCallback((serviceId: string, actualCost: number) => {
    setServices(prev => prev.map(service => {
      if (service.id === serviceId) {
        if (service.assignedTeam) {
          setTeams(prevTeams => prevTeams.map(t => 
            t.id === service.assignedTeam?.id ? { 
              ...t, 
              availability: true,
              currentLoad: Math.max(0, t.currentLoad - 1),
            } : t
          ));
        }
        return {
          ...service,
          status: 'completed',
          completionDate: new Date(),
          actualCost,
        };
      }
      return service;
    }));
  }, []);

  const handleAddTeam = useCallback((team: Omit<Team, 'id'>) => {
    const newTeam: Team = {
      ...team,
      id: Date.now().toString(),
    };
    setTeams(prev => [...prev, newTeam]);
    return newTeam;
  }, []);

  const handleUpdateTeamAvailability = useCallback((teamId: string, availability: boolean) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId ? { ...team, availability } : team
    ));
  }, []);

  return {
    services,
    teams,
    handleSubmit,
    handleAssignTeam,
    handleScheduleService,
    handleServiceComplete,
    handleAddTeam,
    handleUpdateTeamAvailability,
  };
} 