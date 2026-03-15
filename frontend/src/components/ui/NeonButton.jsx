import { motion } from 'framer-motion';

const NeonButton = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary',
    secondary: 'bg-transparent border-2 border-primary hover:bg-primary/20',
    accent: 'bg-gradient-to-r from-accent to-pink-600',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`neon-button ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  );
};

export default NeonButton;
