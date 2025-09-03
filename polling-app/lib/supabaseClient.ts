jest.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          data: [{ id: 1, title: 'Test Poll', user_id: 'user123' }],
          error: null,
        })),
      })),
    })),
  },
}));
