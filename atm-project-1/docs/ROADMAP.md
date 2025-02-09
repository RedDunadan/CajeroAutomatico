# Cajero Automático - Documentación y Planificación

## Funcionalidades Actuales
- [x] Sistema de login con usuarios predefinidos
- [x] Consulta de saldo
- [x] Retiro de dinero
- [x] Depósito de dinero
- [x] Sistema de mensajes para el usuario
- [x] Modalidad de confirmación para transacciones

## Funcionalidades Futuras
- [ ] Registro de nuevos usuarios
- [ ] Historial de transacciones
- [ ] Transferencias entre cuentas
- [ ] Cambio de contraseña
- [ ] Múltiples tipos de cuenta (ahorro, corriente)
- [ ] Impresión de comprobantes
- [ ] Soporte para múltiples idiomas
- [ ] Límites diarios de retiro
- [ ] Sistema de recuperación de contraseña
- [ ] Notificaciones por email de transacciones

## Mejoras Técnicas Pendientes
- [ ] Implementar persistencia de datos
- [ ] Mejorar la seguridad del sistema de autenticación
- [ ] Agregar validaciones más robustas
- [ ] Implementar manejo de errores más detallado
- [ ] Agregar tests unitarios
- [ ] Optimizar el rendimiento de las transacciones

## Notas de Implementación
* Para el historial de transacciones, considerar:
  - Fecha y hora
  - Tipo de transacción
  - Monto
  - Saldo resultante
  - ID de transacción

* Para la seguridad:
  - Implementar tokens JWT
  - Agregar captcha en el login
  - Encriptación de datos sensibles