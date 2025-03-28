import { notification } from "antd";
import axios from "axios";

interface NotificationItem {
  type: "success" | "info" | "warning" | "error";
  message: string;
}

const axiosInstance = axios.create();
let notificationQueue: NotificationItem[] = [];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    if (status === 401) {
      try {
        notificationQueue.push({ type: "error", message: data?.error });
        setTimeout(() => {
          showNotifications();
        }, 4000);
        await new Promise((resolve) => setTimeout(resolve, 8000));
        localStorage.clear();
        window.location.href = "/login";
      } catch (navError) {
        console.error("Navigation to login failed:", navError);
      }
    } else if (status === 500) {
      notificationQueue.push({ type: "error", message: data?.error });
      setTimeout(() => {
        showNotifications();
      }, 5000);
    }

    return Promise.reject(error);
  }
);

function showNotifications() {
  if (notificationQueue?.length >= 1) {
    const uniqueErrorMessages = Array.from(
      new Set(notificationQueue.map((item) => item.message))
    );
    const firstErrorMessage = uniqueErrorMessages;
    notification.error({ message: firstErrorMessage });
    notificationQueue = [];
  }
}

class HttpRequest {
  static patch(arg0: string, token: string) {
    throw new Error("Method not implemented.");
  }
  static async get(url: string, token?: string, p0?: { responseType: string }) {
    try {
      const res = await axiosInstance({
        method: "GET",
        url,
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  static async post(url: string, data: any, token?: string) {
    try {
      const res = await axiosInstance({
        method: "POST",
        url,
        headers: {
          Authorization: token,
        },
        data,
      });

      return res.data;
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }

  static async delete(url: string, token: string, data?: any) {
    try {
      const res = await axiosInstance({
        method: "DELETE",
        url,
        headers: {
          Authorization: token,
        },
        data,
      });

      return res.data;
    } catch (err: any) {
      console.log(err.response);
      return err;
    }
  }

  static async update(url: string, data: any, token: string) {
    try {
      const res = await axiosInstance({
        method: "PUT",
        url,
        headers: {
          Authorization: token,
        },
        data,
      });

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  static async upload(url: string, data: any, token: string) {
    try {
      const res = await axiosInstance({
        method: "POST",
        url,
        data,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      return res.data;
    } catch (err: any) {
      return err;
    }
  }
}

export default HttpRequest;