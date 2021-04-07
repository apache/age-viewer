import { createSlice } from '@reduxjs/toolkit';
import html2canvas from 'html2canvas';

export const Capture = createSlice({
  name: 'capture',
  initialState: [],
  reducers: {
    capturePng: {
      reducer: (state, action) => {
        const frameKey = action.payload.refKey;
        state.splice(state.findIndex((frame) => (frame.frameProps.key === frameKey)), 1);
        state.map((frame) => {
          html2canvas(frame).then((canvas) => {
            const saveImgLink = canvas.toDataURL();
            const link = document.createElement('a');
            link.download = 'saveimage';
            link.href = saveImgLink;
            link.click();
          });
          return frame;
        });
      },
      prepare: (refKey) => ({ payload: { refKey } }),
    },
  },
});

export const { capturePng } = Capture.actions;
export default Capture.reducer;
