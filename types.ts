
import type React from 'react';

export interface Service {
  icon: React.FC<{className: string}>;
  title: string;
  description: string;
}

export interface Project {
  image: string;
  title: string;
  location: string;
  capacity: string;
  type: string;
  description: string;
  year: string;
}
