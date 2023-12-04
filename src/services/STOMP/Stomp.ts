import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


const MyStompComponent = () => {
  useEffect(() => {
    // Crear una instancia de SockJS
    const socket = new SockJS('http://localhost:8080/ws-endpoint'); // Reemplaza con la URL de tu servidor WebSocket

    // Configurar el cliente STOMP
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws-endpoint', // Reemplaza con la URL de tu servidor WebSocket
      connectHeaders: {
        // Puedes incluir headers de autenticación u otros si es necesario
      },
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-endpoint'), // Reemplaza con la URL de tu servidor WebSocket
    });

    // Conectar al servidor STOMP
    stompClient.activate();

    // Suscribirse a un canal (topic) específico
    const subscription = stompClient.subscribe('/topic/my-topic', (message) => {
      console.log('Received message:', JSON.parse(message.body));
    });

    // Limpiar la suscripción al desmontar el componente
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);
};

export default MyStompComponent;
