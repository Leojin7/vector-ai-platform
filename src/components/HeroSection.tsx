import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl glass-card rounded-2xl shadow-xl p-12 flex flex-col items-center text-center"
      >
        <img src="https://videos.openai.com/vg-assets/assets%2Ftask_01jygn2rhyfrbrhy7d7vb2pb2a%2F1750758323_img_2.webp?st=2025-06-26T17%3A57%3A52Z&se=2025-07-02T18%3A57%3A52Z&sks=b&skt=2025-06-26T17%3A57%3A52Z&ske=2025-07-02T18%3A57%3A52Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=k0NJq9Yu%2BOjjqIRVQqNsoJCUiSzLuYua3r6kJaawpic%3D&az=oaivgprodscus" alt="AI Art" className="mx-auto mb-8 rounded-xl w-80 h-56 object-cover" />
        <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-200 mb-4">
          Automate your workflows with <span className="text-blue-400 dark:text-silver">AI</span>
        </h1>
        <p className="text-lg text-blue-900 dark:text-silver mb-8">Build and run AI workflows in minutes. No code required.</p>
        <a
          href="/dashboard"
          className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-700 text-white font-bold shadow-lg hover:scale-105 transition"
        >
          Get started
        </a>
      </motion.div>
    </section>
  );
}
