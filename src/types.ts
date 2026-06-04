export type SubdomainType = 'portal' | 'game' | 'work' | 'velkora';

export interface ProjectType {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  status: 'operational' | 'experimental' | 'classified';
  year: string;
  metric?: string;
  details?: string;
}

export interface GameProjectType {
  id: string;
  title: string;
  genre: string;
  description: string;
  engine: string;
  status: 'released' | 'in-development' | 'prototype';
  playUrl?: string;
  features: string[];
}

export interface VelkoraLogType {
  id: string;
  sector: string;
  designation: string;
  timestamp: string;
  classification: 'UNRESTRICTED' | 'RESTRICTED' | 'CONFIDENTIAL' | 'EYE-ONLY';
  title: string;
  summary: string;
  content: string;
  coordinates: string;
}

export interface LabLog {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'error';
  module: 'CORE' | 'GAME' | 'WORK' | 'VELKORA';
  message: string;
}
