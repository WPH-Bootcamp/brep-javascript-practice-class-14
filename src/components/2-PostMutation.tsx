import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '../api/posts';
import { postKeys } from '../lib/queryKeys';
import type { CreatePostInput } from '../types/post.type';

const initialForm: CreatePostInput = {
  userId: 1,
  title: '',
  body: '',
};

export default function PostMutation() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<CreatePostInput>(initialForm);

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: async (newPost) => {
      console.log('Post berhasil dibuat : ', newPost);
      await queryClient.invalidateQueries({
        queryKey: postKeys.all,
      });
      setForm(initialForm);
    },
    onError: (error) => {
      console.error('Gagal membuat post', error);
    },
  });

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) {
      return;
    }

    createMutation.mutate(form);
  }
  return (
    <section>
      <h2>Tambah Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Judul : </label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="body">Isi Post : </label>
          <input
            type="text"
            name="body"
            id="body"
            value={form.body}
            onChange={(e) =>
              setForm({
                ...form,
                body: e.target.value,
              })
            }
          />
        </div>
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Menyimpan' : 'Tambah Post'}
        </button>
      </form>

      {createMutation.isError && <p>Error : {createMutation.error.message}</p>}

      {createMutation.isSuccess && (
        <div>
          <p>Post berhasil dibuat.</p>
          <pre>{JSON.stringify(createMutation.data, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}
