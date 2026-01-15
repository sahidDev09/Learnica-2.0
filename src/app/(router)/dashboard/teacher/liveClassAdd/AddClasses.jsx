"use client";

import { 
  format, 
  addDays, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  eachDayOfInterval,
  isToday,
  isBefore,
  startOfToday
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { 
  Video, 
  Link as LinkIcon, 
  Calendar as CalendarIcon, 
  BookOpen, 
  User, 
  Mail, 
  Hash,
  ChevronLeft,
  ChevronRight,
  Clock,
  Check
} from "lucide-react";

export default function AddClasses() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    thumbnail: "",
    courseName: "",
    category: "",
    authorName: "",
    authorId: user?.id || "",
    authorEmail: user?.primaryEmailAddress?.emailAddress || "",
    liveLink: "",
    liveTime: "",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
    "09:00 PM"
  ];

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/courses"
        );
        const authorData = response.data;

        setFormData((prevFormData) => ({
          ...prevFormData,
          authorName: authorData.authorName || user?.fullName || "",
          authorId: authorData.authorId || user?.id || "",
          authorEmail:
            authorData.authorEmail ||
            user?.primaryEmailAddress?.emailAddress ||
            "",
        }));
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAuthorData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.liveTime) {
      Swal.fire("Error", "Please select a date and time for the live class", "error");
      return;
    }

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/add-classes",
        formData
      );
      
      Swal.fire({
        title: "Success!",
        text: "Live class has been added successfully!",
        icon: "success",
        confirmButtonColor: "#135276",
      });

      setFormData({
        thumbnail: "",
        courseName: "",
        category: "",
        authorName: user?.fullName || "",
        authorId: user?.id || "",
        authorEmail: user?.primaryEmailAddress?.emailAddress || "",
        liveLink: "",
        liveTime: "",
      });
      setSelectedTime("");
    } catch (error) {
      console.error("Error adding course:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while adding the live class.",
        icon: "error",
        confirmButtonColor: "#135276",
      });
    }
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    if (selectedTime) {
      const formattedTime = `${selectedTime}, ${format(day, "dd MMM yyyy")}`;
      setFormData(prev => ({ ...prev, liveTime: formattedTime }));
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    const formattedTime = `${time}, ${format(selectedDate, "dd MMM yyyy")}`;
    setFormData(prev => ({ ...prev, liveTime: formattedTime }));
    // Auto close after both selections are made
    setIsPickerOpen(false);
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-t-xl border-b border-gray-100">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1 hover:bg-white rounded-full transition-colors text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-gray-800">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 hover:bg-white rounded-full transition-colors text-gray-600"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-tighter py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
    const today = startOfToday();

    return (
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const isCurrMonth = isSameMonth(day, monthStart);
          const isDisabled = isBefore(day, today) && !isToday(day);

          return (
            <button
              key={day.toString()}
              type="button"
              disabled={isDisabled}
              onClick={() => handleDateSelect(day)}
              className={`
                relative h-10 w-full flex items-center justify-center rounded-lg text-sm transition-all
                ${!isCurrMonth ? "text-gray-300" : "text-gray-700"}
                ${isSelected ? "bg-[#135276] text-white font-bold shadow-md scale-105" : "hover:bg-purple-50"}
                ${isDisabled ? "opacity-30 cursor-not-allowed grayscale" : "cursor-pointer"}
                ${isToday(day) && !isSelected ? "border border-[#135276] text-[#135276]" : ""}
              `}
            >
              <span>{format(day, "d")}</span>
              {isToday(day) && !isSelected && (
                <div className="absolute bottom-1 w-1 h-1 bg-[#135276] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-[fadeInUp_0.6s_ease-out]">
        <div className="bg-[#135276] p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Video className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">Add Live Class</h2>
          </div>
          <p className="text-purple-100">Schedule a new live session for your students</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <LinkIcon className="w-4 h-4 text-[#135276]" /> Thumbnail URL
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#135276] focus:ring-2 focus:ring-[#135276]/20 transition-all outline-none bg-gray-50/50"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="relative group">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-[#135276]" /> Course Name
                </label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#135276] focus:ring-2 focus:ring-[#135276]/20 transition-all outline-none bg-gray-50/50"
                  placeholder="Enter course name"
                  required
                />
              </div>

              <div className="relative group">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-[#135276]" /> Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#135276] focus:ring-2 focus:ring-[#135276]/20 transition-all outline-none bg-gray-50/50"
                  placeholder="e.g. Development"
                  required
                />
              </div>

              <div className="relative group opacity-75">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-500" /> Author Name
                </label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-600 outline-none"
                  disabled
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <LinkIcon className="w-4 h-4 text-[#135276]" /> Live Stream Link
                </label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#135276] focus:ring-2 focus:ring-[#135276]/20 transition-all outline-none bg-gray-50/50"
                  placeholder="https://zoom.us/..."
                  required
                />
              </div>

              {/* Enhanced Live Time Picker */}
              <div className="relative group">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <CalendarIcon className="w-4 h-4 text-[#135276]" /> Live Time
                </label>
                <div 
                  onClick={() => setIsPickerOpen(!isPickerOpen)}
                  className={`w-full px-4 py-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between
                    ${formData.liveTime ? "border-[#135276] bg-[#135276]/5" : "border-gray-200 bg-gray-50/50"}
                    ${isPickerOpen ? "ring-2 ring-[#135276]/20" : ""}
                  `}
                >
                  <span className={formData.liveTime ? "text-[#135276] font-medium" : "text-gray-400"}>
                    {formData.liveTime || "Select Date and Time"}
                  </span>
                  <Clock className={`w-4 h-4 ${formData.liveTime ? "text-[#135276]" : "text-gray-400"}`} />
                </div>

                <AnimatePresence>
                  {isPickerOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 right-0 md:left-auto md:right-0 md:w-[450px] mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row h-full md:h-[400px]">
                        {/* Calendar Side */}
                        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-100">
                          {renderHeader()}
                          {renderDays()}
                          {renderCells()}
                        </div>

                        {/* Time Side */}
                        <div className="w-full md:w-[150px] flex flex-col h-full">
                          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Select Time
                          </div>
                          <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                            <div className="space-y-1">
                              {timeSlots.map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => handleTimeSelect(time)}
                                  className={`
                                    w-full px-3 py-2 rounded-lg text-sm text-center transition-all flex items-center justify-between
                                    ${selectedTime === time 
                                      ? "bg-[#135276] text-white font-bold" 
                                      : "hover:bg-purple-50 text-gray-600"}
                                  `}
                                >
                                  {time}
                                  {selectedTime === time && <Check className="w-3 h-3" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative group opacity-75">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-gray-500" /> Author ID
                </label>
                <input
                  type="text"
                  name="authorId"
                  value={formData.authorId}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-600 outline-none"
                  disabled
                />
              </div>

              <div className="relative group opacity-75">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-gray-500" /> Author Email
                </label>
                <input
                  type="email"
                  name="authorEmail"
                  value={formData.authorEmail}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-600 outline-none"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-[#135276]/80 hover:bg-[#135276] text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-purple-200 transition-all hover:-translate-y-1 active:scale-95"
            >
              Post Live Class
            </Button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
