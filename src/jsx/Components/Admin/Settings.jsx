import { ArrowDownToLine, ArrowUpFromLine, Clock, Users, UserCheck, UsersRound, BookOpen, PieChart, Wallet } from 'lucide-react';
import StatCard from './StatCard';

const stats = [
  {
    icon: ArrowDownToLine,
    label: "Total Deposit",
    value: "$2,372,341.60",
  },
  {
    icon: ArrowUpFromLine,
    label: "Total Withdrawal",
    value: "$2,372,341.60",
  },
  {
    icon: Clock,
    label: "Pending Withdrawal",
    value: "$910.00",
  },
  {
    icon: Users,
    label: "Active User",
    value: "$69.00",
  },
  {
    icon: UserCheck,
    label: "Verified User",
    value: "$69.00",
  },
  {
    icon: UsersRound,
    label: "Total User",
    value: "$710.00",
  },
  {
    icon: PieChart,
    label: "A Book Profit",
    value: "$23,741.60",
  },
  {
    icon: BookOpen,
    label: "A Book Brokerage",
    value: "$23,741.60",
  },
  {
    icon: Wallet,
    label: "A Book Deposit",
    value: "$10,215.00",
  },
  {
    icon: ArrowUpFromLine,
    label: "A Book Withdrawal",
    value: "$10,215.00",
  },
  {
    icon: Wallet,
    label: "B Book Deposit",
    value: "$23,741.60",
  },
  {
    icon: PieChart,
    label: "B Book Profit",
    value: "$23,741,457.60",
  },
  {
    icon: BookOpen,
    label: "B Book Brokerage",
    value: "$19,742.30",
  },
  {
    icon: ArrowUpFromLine,
    label: "B Book Withdrawal",
    value: "$723,741.60",
  },
];

const Settings = () => {
    return (
        <div className="grid gap-4 bg-[#F5F3FF] p-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>
      );
}

export default Settings