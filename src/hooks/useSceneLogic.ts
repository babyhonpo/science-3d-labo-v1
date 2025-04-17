import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";
import { getCollisionResult } from "../utils/collisionRules";
import { DraggableObject, ObjectType } from "../types/types";

/**
* シーン内のオブジェクトのの状態・操作を管理するカスタムフック
*
* - ドラッグ可能オブジェクトの追加・管理
* - 衝突検出と合成処理
* - モーダルの開閉
* - ドラッグ状態の管理
*
* @returns {{
*  objectRefs: React.RefObject<Map<string, DraggableObject>>;
* selectedItems: string[];
* isModalOpen: boolean;
* handleOpen: () => void;
* handleClose: () => void;
* handleAddItem: (type: ObjectType, position: THREE.Vector3) => void;
* handleCollision: (ids: string[]) => void;
* setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
* }} シーン操作に必要な状態や操作関数のオブジェクト
*/
export const useSceneLogic = (mode: "creation" | "reaction") => {
  const objectRefs = useRef<Map<string, DraggableObject>>(new Map());
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isDragging, setIsDragging] = useState(false); // ドラッグ状態を管理
  const [isModalOpen, setOpen] = useState(false);

  const summonOffset = useRef(new THREE.Vector3(0, 0, 0));

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    summonOffset.current.set(0, 0, 0);
  }

useEffect(() => {
  setSelectedItems(Array.from(objectRefs.current.keys())); // `objectRefs` を `selectedItems` に同期
}, []);

  // アイテム追加ボタンがクリックされたときのオブジェクトを追加
  const handleAddItem = useCallback((type: ObjectType, basePosition: THREE.Vector3) => {
    const id = uuidv4();

    const position = basePosition.clone().add(summonOffset.current);

    const newObj: DraggableObject = {
      id,
      objInfo: type, // ここで type を直接格納
      mesh: React.createRef<THREE.Mesh>(),
      position,
      radius: 1,
    };

    objectRefs.current.set(id, newObj);
    setSelectedItems((prev) => [...prev, id]);

    summonOffset.current.add(new THREE.Vector3(2, 0, 0)); // 次のアイテムの位置を調整
  }, []);

  const handleCollision = useCallback((ids: string[]) => {
    if (ids.length < 2 ) return; // 2つ未満では何も起こさない

    const objects = ids
      .map((id) => objectRefs.current.get(id))
      .filter((obj): obj is DraggableObject => obj !== undefined);

    if (objects.length != ids.length) return;

    const symbols = objects.map((obj) => obj.objInfo.symbol);
    // if (symbols.includes(undefined)) return;

    const newType = getCollisionResult(symbols, mode);
    console.log("symbols:", symbols, "mode:", mode, "→ result:", newType);
    if (newType === null) return;

    const newPosition = objects
    .map((obj) => obj.position)
    .reduce((acc, pos) => acc.add(pos.clone()), new THREE.Vector3())
    .multiplyScalar(1 / objects.length);

    ids.forEach((id) => objectRefs.current.delete(id)); // 衝突したアイテムを削除

    const newId = uuidv4();
    // **衝突した位置の中間地点に新しいアイテムを配置**
    const newObj: DraggableObject = {
      id: newId,
      objInfo: {
        //エフェクト用
        symbol: newType,
        color: "red",
      },
      mesh: React.createRef<THREE.Mesh>(),
      position: newPosition,
      radius: 1,
    };

    objectRefs.current.set(newId, newObj);

    setSelectedItems((prev) => [
      ...prev.filter((id) => !ids.includes(id)),
      newId,
    ]);
  }, [mode]);

  return {
    objectRefs, // 全オブジェクトの参照を保持
    selectedItems, // 表示対象のオブジェクトIDリスト
    isModalOpen, // モーダルの表示状態
    handleOpen, // モーダルを開く関数
    handleClose, // モーダルを閉じる関数
    handleAddItem, // アイテム追加関数
    handleCollision, // 衝突処理関数
    setIsDragging,// ドラッグ状態を外部で制御するための関数
  };
};

