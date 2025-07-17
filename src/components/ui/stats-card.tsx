import React from 'react';
import { cn } from '../../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow duration-200",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-neutral-800">{value}</p>
          {description && (
            <p className="text-sm text-neutral-500 mt-1">{description}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-sm font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-sm text-neutral-500 ml-1">vs hier</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard; 