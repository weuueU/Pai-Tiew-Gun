
'use client';
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { format } from 'date-fns';

const people = ['น้องที', 'น้องโชกุน', 'น้องโฟกัส', 'น้องน่านน้ำ', 'น้องนอร์ธ', 'น้องหมอก', 'น้องทับทิม', 'น้องอิ๊คิว', 'น้องมิจัง', 'น้องมะเฟือง', 'น้องอั่งเปา', 'น้องแพตตี้', 'น้องอั้ยสี้', 'แม่ฝ้าย', 'น้องชนัน',
                'น้องต้นข้าว', 'น้องมะหมี่', 'น้องลูกปัด', 'น้องเอ้', 'น้องพอลเพียง', 'น้องสแดมป์', 'น้องไอซ์สุ', 'น้องเนย', 'น้องด่าวด๊าว'];
const months = ['เมษายน 2026', 'พฤษภาคม 2026', 'มิถุนายน 2026'];

export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState('');
  const [availabilities, setAvailabilities] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    if (selectedPerson) {
      const savedDates = availabilities[selectedPerson] || [];
      setSelectedDates(savedDates);
    }
  }, [selectedPerson, availabilities]);

  const handleDateSelect = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    setSelectedDates((prev) =>
      prev.includes(dateStr) ? prev.filter((d) => d !== dateStr) : [...prev, dateStr]
    );
  };

  const handleSave = () => {
    if (!selectedPerson) return;
    setAvailabilities({ ...availabilities, [selectedPerson]: selectedDates });
    setSelectedDates([]);
    alert('บันทึกข้อมูลเรียบร้อย');
  };

  const getCommonDates = () => {
    const allDates = Object.values(availabilities);
    if (allDates.length === 0) return [];
    return allDates.reduce((acc, dates) => acc.filter((d) => dates.includes(d)));
  };

  const commonDates = getCommonDates();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">ไปแอ่วกันเต๊อะ!!</h1>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">น้องชื่ออะไร น้องชื่ออะไร</h2>
          <select
            className="border p-2 rounded w-full"
            value={selectedPerson}
            onChange={(e) => setSelectedPerson(e.target.value)}
          >
            <option value="">...น้องชื่อ...</option>
            {people.map((person) => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>
        </CardContent>
      </Card>

      {selectedPerson && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">ว่างวันไหนกัน ติ๊กเลย</h2>
            <Tabs defaultValue="2026-04">
              <TabsList>
                {months.map((month) => (
                  <TabsTrigger key={month} value={month}>{month}</TabsTrigger>
                ))}
              </TabsList>
              {months.map((month) => (
                <TabsContent key={month} value={month}>
                  <Calendar
                    mode="multiple"
                    selected={selectedDates.map((d) => new Date(d))}
                    onSelect={handleDateSelect}
                    month={new Date(`${month}-01`)}
                  />
                </TabsContent>
              ))}
            </Tabs>
            <Button onClick={handleSave} className="mt-4">ว่างประมาณนี้แหละ</Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">มาเที่ยวกันทั้งหมด: {Object.keys(availabilities).length}</h2>
          <h3 className="font-medium mb-2">ว่างตรงกันเท่านี้</h3>
          <Tabs defaultValue="2026-04">
            <TabsList>
              {months.map((month) => (
                <TabsTrigger key={month} value={month}>{month}</TabsTrigger>
              ))}
            </TabsList>
            {months.map((month) => (
              <TabsContent key={month} value={month}>
                <Calendar
                  mode="multiple"
                  selected={commonDates.map((d) => new Date(d))}
                  month={new Date(`${month}-01`)}
                  modifiers={{ highlighted: commonDates.map((d) => new Date(d)) }}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
