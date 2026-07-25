import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  date = new Date();

  stats = {
    totalTasks: 24,
    completedTasks: 14,
    activeHabits: 5,
    avgSleep: 7.2,
    productivity: 78,
  };

  quickActions = [
    { label: 'New Board', icon: 'pi-plus', link: '/boards' },
    { label: 'Statistics', icon: 'pi-chart-bar', link: '/statistics' },
    { label: 'Profile', icon: 'pi-user', link: '/settings' },
  ];

  boards = [
    {
      name: 'Personal',
      icon: 'pi-user',
      color: 'from-blue-500 to-indigo-600',
      tasks: 8,
    },
    {
      name: 'Work',
      icon: 'pi-briefcase',
      color: 'from-emerald-500 to-teal-600',
      tasks: 12,
    },
    {
      name: 'Study',
      icon: 'pi-book',
      color: 'from-violet-500 to-purple-600',
      tasks: 4,
    },
  ];
}
