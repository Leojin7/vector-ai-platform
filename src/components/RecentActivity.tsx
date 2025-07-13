import { motion } from 'framer-motion';

const activities = [
  { icon: '✔️', desc: "Workflow 'Data Processing' completed", time: '2 hours ago' },
  { icon: '▶️', desc: "Workflow 'Customer Onboarding' started", time: '4 hours ago' },
  { icon: '📝', desc: "Workflow 'Report Generation' updated", time: '1 day ago' },
  { icon: '➕', desc: "Workflow 'Email Automation' created", time: '2 days ago' },
  { icon: '⏸️', desc: "Workflow 'Data Analysis' paused", time: '3 days ago' },
];

export default function RecentActivity() {
  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold mb-6 text-white">Recent Activity</h2>
      <div className="glass-card rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        {activities.map((act, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.6 }}
          >
            <span className="text-2xl">{act.icon}</span>
            <span className="flex-1 text-lg font-semibold text-white">{act.desc}</span>
            <span className="text-sm text-gray-400">{act.time}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

