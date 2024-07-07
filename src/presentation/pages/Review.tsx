import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
// import Textarea from '@mui/joy/Textarea';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useState } from 'react';

const Review = () => {
  // 評点の状態
  const [grade, setGrade] = useState<number>(0);


  // 評点が変更された時の処理
  const handleChange = (event: SelectChangeEvent) => {
    setGrade(Number(event.target.value));
  };
  
  return (
      <>
          <div className="flex h-screen">
            {/* PDF表示 */}
            <div className="w-9/12 ">
              <div className="overflow-x-auto whitespace-nowrap">
                <div className="overflow-y-auto inline-block w-96 h-32 bg-red-500 m-2 h-screen">Item 1</div>
                <div className="overflow-y-auto inline-block w-96 h-32 bg-blue-500 m-2 h-screen">Item 2</div>
                <div className="overflow-y-auto inline-block w-96 h-32 bg-green-500 m-2">Item 3</div>
                <div className="overflow-y-auto inline-block w-96 h-32 bg-yellow-500 m-2">Item 4</div>
                <div className="overflow-y-auto inline-block w-96 h-32 bg-purple-500 m-2">Item 5</div>
              </div>
            </div>
            {/* sidebar */}
            <div className="w-3/12 p-6 border border-l-gray-600">
            
              {/* 学生選択のラジオボタン */}
              {/* <div className="mb-2"> */}
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <h1 className="text-2xl font-bold">学生選択</h1>
                <div className="flex flex-col">
                  <div className="flex items-center p-1 pl-5">
                    <input type="radio" id="student1" name="student" value="student1" />
                    <label htmlFor="student1">学生1</label>
                  </div>
                  <div className="flex items-center p-1 pl-5">
                    <input type="radio" id="student2" name="student" value="student2" />
                    <label htmlFor="student2">学生2</label>
                  </div>
                  <div className="flex items-center p-1 pl-5">
                    <input type="radio" id="student3" name="student" value="student3" />
                    <label htmlFor="student3">学生3</label>
                  </div>
                </div>
              </Box>

              {/* 提出者情報 */}
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <h1 className="text-2xl font-bold">提出者情報</h1>
                <ul className="p-1 pl-5">
                  <li>学生名：学生1</li>
                  <li>学籍番号：0000000</li>
                  <li>提出日時：2021/09/01 12:00</li>
                </ul>
              </Box>


              
              {/* 分類 セレクトボタン*/}
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <h1 className="text-2xl font-bold">評点</h1>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">評点</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={grade.toString()}
                    label="評点"
                    onChange={handleChange}
                  >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* 点数 */}
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              > 
                <h1 className="text-2xl font-bold">点数</h1>
                <TextField id="outlined-basic" label="点数" variant="outlined" />
              </Box>

              {/* メモ テキストエリア*/}
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              > 
                <h1 className="text-2xl font-bold">メモ</h1>
                <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
              </Box>

              {/* フィードバック テキストエリア*/}
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <h1 className="text-2xl font-bold">フィードバック</h1>
                <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your feedback here..."></textarea>
              </Box>
              
            </div>
          </div>
      </>
  )
};

export default Review;
