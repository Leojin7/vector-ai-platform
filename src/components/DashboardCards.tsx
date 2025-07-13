import { motion } from 'framer-motion';

const stats = [
  { label: 'Active Models', value: '12', change: '+10%' },
  { label: 'Workflows', value: '4', change: '+5%' },
  { label: 'API Requests', value: '123', change: '+20%' },
  { label: 'Uptime', value: '99.9%', change: '+0.1%' },
];

export default function DashboardCards() {
  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold mb-8 text-white">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="rounded-2xl glass-card p-8 flex flex-col items-start shadow-lg hover:scale-105 transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="text-lg text-gray-300 mb-2">{stat.label}</div>
            <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
            <div className="text-green-400 font-semibold">{stat.change}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
