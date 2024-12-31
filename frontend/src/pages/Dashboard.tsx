import React from 'react';
import {
  UserGroupIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const stats = [
  {
    name: 'Total Students',
    stat: '1,200',
    icon: UserGroupIcon,
    change: '+4.75%',
    changeType: 'increase',
  },
  {
    name: 'Total Staff',
    stat: '85',
    icon: AcademicCapIcon,
    change: '+2.35%',
    changeType: 'increase',
  },
  {
    name: 'Revenue (Monthly)',
    stat: '$48,352',
    icon: CurrencyDollarIcon,
    change: '+3.2%',
    changeType: 'increase',
  },
  {
    name: 'Library Books',
    stat: '3,450',
    icon: BookOpenIcon,
    change: '+2.8%',
    changeType: 'increase',
  },
];

const attendanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Student Attendance %',
      data: [95, 92, 94, 93, 95, 96],
      borderColor: 'rgb(14, 165, 233)',
      backgroundColor: 'rgba(14, 165, 233, 0.5)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly Attendance Rate',
    },
  },
};

export default function Dashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <Line options={options} data={attendanceData} />
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Activities
          </h3>
          <div className="mt-4">
            <div className="flow-root">
              <ul className="-mb-8">
                <li className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 ring-8 ring-white">
                        <UserGroupIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          New student admission{' '}
                          <span className="font-medium text-gray-900">
                            John Doe
                          </span>
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        1h ago
                      </div>
                    </div>
                  </div>
                </li>
                <li className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
                        <CurrencyDollarIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          Fee payment received{' '}
                          <span className="font-medium text-gray-900">$550</span>
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        3h ago
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
