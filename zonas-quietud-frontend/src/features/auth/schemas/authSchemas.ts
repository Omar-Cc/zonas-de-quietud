import { z } from 'zod';

// Password validation regex
const passwordRegex = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*(),.?":{}|<>]/,
};

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register Schema
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'El email es requerido')
      .email('Email inválido'),
    password: z
      .string()
      .min(6, 'Mínimo 6 caracteres')
      .regex(passwordRegex.uppercase, 'Debe contener al menos una mayúscula')
      .regex(passwordRegex.lowercase, 'Debe contener al menos una minúscula')
      .regex(passwordRegex.number, 'Debe contener al menos un número')
      .regex(passwordRegex.special, 'Debe contener al menos un carácter especial'),
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Onboarding Schema
export const onboardingSchema = z.object({
  firstName: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z
    .string()
    .min(1, 'El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[1-9]\d{1,14}$/.test(val),
      'Número de teléfono inválido'
    ),
  birthDate: z
    .string()
    .min(1, 'La fecha de nacimiento es requerida')
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 13 && age <= 120;
    }, 'Debes tener al menos 13 años'),
  gender: z
    .enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'])
    .optional()
    .default('PREFER_NOT_TO_SAY'),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

// Helper function to validate password strength
export const validatePasswordStrength = (password: string) => {
  return {
    minLength: password.length >= 6,
    hasUpperCase: passwordRegex.uppercase.test(password),
    hasLowerCase: passwordRegex.lowercase.test(password),
    hasNumber: passwordRegex.number.test(password),
    hasSpecialChar: passwordRegex.special.test(password),
  };
};
